import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTask1646558397663 implements MigrationInterface {
  name = 'AlterTableTask1646558397663';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`description\` text NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`short_summary\` text NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`priority\` int NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`type\` int NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`type\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`priority\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`short_summary\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`description\`
        `);
  }
}

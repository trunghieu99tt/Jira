import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableBoard1643044482324 implements MigrationInterface {
  name = 'AlterTableBoard1643044482324';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`boards\`
            ADD \`privacy\` enum ('PUBLIC', 'PRIVATE') NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`boards\`
            ADD \`description\` varchar(255) NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`boards\` DROP COLUMN \`description\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`boards\` DROP COLUMN \`privacy\`
        `);
  }
}

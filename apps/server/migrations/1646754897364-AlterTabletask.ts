import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTabletask1646754897364 implements MigrationInterface {
  name = 'AlterTabletask1646754897364';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`type\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`type\` varchar(255) NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`type\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`type\` int NOT NULL
        `);
  }
}
